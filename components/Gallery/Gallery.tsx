import { ChangeEvent, FC, MouseEvent, useEffect, useState } from "react";
import { TiDelete, TiTick } from "react-icons/ti";

import Button from "../UI/Button/Button";
import Files from "./Files/Files";
import Header from "../UI/Header/Header";
import { IFile } from "../../interfaces/file";
import { IImage } from "../../interfaces/image";
import Image from "next/image";
import Lightbox from "../Lightbox/Lightbox";
import Loader from "../UI/Loader/Loader";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import classes from "./Gallery.module.scss";
import { useSession } from "next-auth/react";

const Gallery: FC = () => {
  const { data: session } = useSession();
  const [images, setImages] = useState<IImage[] | null>(null);
  const [lightbox, setLightbox] = useState<number | false>(false);
  const [files, setFiles] = useState<IFile[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState<string | false>(false);

  useEffect(() => {
    const getImages = async () => {
      const { data } = await axios.get<{ gallery: IImage[] }>("api/gallery");
      setImages(data.gallery);
    };

    getImages();
  }, []);

  const closeLightbox = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      setLightbox(false);
    }
  };

  const setImagesHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const files = Array.from(e.target.files).map((file) => ({ content: file, status: 0 }));
      setFiles(files);
    }
  };

  const sendImagesHandler = async () => {
    if (files) {
      setLoading(true);
      await Promise.all(
        files.map(async (file) => {
          const { data } = await axios.patch<IImage>("api/gallery", { extension: file.content.name.split(".").pop() });

          const config = {
            onUploadProgress: (progressEvent: ProgressEvent) => {
              let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
              setFiles((prevFiles) => prevFiles && prevFiles.map((prevFile) => (prevFile.content.name === file.content.name ? { ...prevFile, status: percentCompleted } : prevFile)));
            },
          };

          await axios.put(data.url, file.content, config);
          setImages((prevImages) => [{ id: data.id, url: URL.createObjectURL(file.content) }, ...(prevImages ? prevImages : [])]);
        })
      );
      setLoading(false);
    }
  };

  const deleteHandler = async (id: string) => {
    await axios.delete("api/gallery", { data: { id } });
    setImages((prevImages) => (prevImages ? prevImages.filter((prevImage) => prevImage.id !== id) : null));
    setConfirm(false);
  };

  return (
    <div className={classes.gallery}>
      {images && lightbox !== false && <Lightbox images={images.map((image) => image.url)} image={lightbox} onClick={closeLightbox} />}
      {images ? (
        <>
          <div className={classes.images}>
            {images.length ? (
              images.map((image, index) => (
                <div className={classes.image} key={image.id}>
                  <Image src={`${process.env.NEXT_PUBLIC_s3_bucketUrl}/${image.url}`} width={216} height={142} layout={"responsive"} objectFit="cover" alt="" onClick={() => setLightbox(index)} />
                  {session && (
                    <div className={classes.actions}>
                      {!confirm && (
                        <div className={classes.delete}>
                          <RiDeleteBin6Line onClick={() => setConfirm(image.id)} />
                        </div>
                      )}
                      {confirm === image.id && (
                        <div className={classes.confirm}>
                          <TiTick onClick={() => deleteHandler(image.id)} />
                          <TiDelete onClick={() => setConfirm(false)} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div>Brak zdjęć</div>
            )}
          </div>
          {session && (
            <div className={classes.admin}>
              <input type={"file"} multiple accept=".jpg,.png,.jpeg" onChange={setImagesHandler} />
              {files && (
                <>
                  <Files files={files} />
                  {loading ? <Button disabled>Dodawanie zdjęć...</Button> : <Button onClick={sendImagesHandler}>Dodaj zdjęcia</Button>}
                </>
              )}
            </div>
          )}
        </>
      ) : (
        <Loader>Wczytywanie galerii...</Loader>
      )}
    </div>
  );
};

export default Gallery;
