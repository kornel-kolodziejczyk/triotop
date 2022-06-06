import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";

import Button from "../../UI/Button/Button";
import ConfirmButton from "../../UI/ConfirmButton/ConfirmButton";
import Header from "../../UI/Header/Header";
import { IAudio } from "../../../interfaces/audio";
import { IFile } from "../../../interfaces/file";
import Loader from "../../UI/Loader/Loader";
import ReactAudioPlayer from "react-audio-player";
import axios from "axios";
import classes from "./Audios.module.scss";
import { useSession } from "next-auth/react";

const Audios: FC = () => {
  const [audios, setAudios] = useState<IAudio[] | null>(null);
  const [file, setFile] = useState<IFile | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const getAudios = async () => {
      const { data } = await axios.get<{ audios: IAudio[] }>("/api/audio");
      setAudios(data.audios);
    };
    getAudios();
  }, []);

  const setFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile({ content: e.target.files[0], status: 0 });
    }
  };

  const sendAudioHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file) {
      setLoading(true);

      const { data } = await axios.patch<IAudio>("api/audio", { extension: file.content.name.split(".").pop(), title });

      const config = {
        onUploadProgress: (progressEvent: ProgressEvent) => {
          let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
          setFile((prevFile) => prevFile && { ...prevFile, status: percentCompleted });
        },
      };

      await axios.put(data.url, file.content, config);
      setAudios((prevAudios) => [{ ...data }, ...(prevAudios ? prevAudios : [])]);
      setTitle("");
      setLoading(false);
    }
  };

  const deleteAudioHandler = async (id: string) => {
    await axios.delete("api/audio", { data: { id } });
    setAudios((prevAudios) => (prevAudios ? prevAudios.filter((audio) => audio.id !== id) : null));
  };

  return (
    <div className={classes.audios}>
      {audios ? (
        <>
          {/* <Header>Audio</Header> */}
          {session && (
            <form onSubmit={sendAudioHandler}>
              <input type="file" required multiple accept=".mp3" onChange={setFileHandler} />
              <input type="text" required value={title} placeholder="Tytuł nagrania" onChange={(e) => setTitle(e.target.value)} />
              {loading ? <Button disabled>Dodawanie nagrania... {file ? file.status && `${file.status} %` : null}</Button> : <Button disabled={!file || !title}>Dodaj nagranie</Button>}
            </form>
          )}
          <div className={classes.content}>
            {audios.length ? (
              audios.map((audio) => (
                <div key={audio.id} className={classes.audio}>
                  <div>{audio.title}</div>
                  <ReactAudioPlayer src={`${process.env.NEXT_PUBLIC_s3_bucketUrl}/${audio.url}`} controls />
                  {session && (
                    <div className={classes.actions}>
                      <ConfirmButton onConfirm={() => deleteAudioHandler(audio.id)}>Usuń nagranie</ConfirmButton>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div>Brak nagrań</div>
            )}
          </div>
        </>
      ) : (
        <Loader>Wczytywanie nagrań...</Loader>
      )}
    </div>
  );
};

export default Audios;
