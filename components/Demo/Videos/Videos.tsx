import { FC, FormEvent, useEffect, useState } from "react";

import Button from "../../UI/Button/Button";
import ConfirmButton from "../../UI/ConfirmButton/ConfirmButton";
import Header from "../../UI/Header/Header";
import { IVideo } from "../../../interfaces/video";
import Loader from "../../UI/Loader/Loader";
import YouTube from "react-youtube";
import axios from "axios";
import classes from "./Videos.module.scss";
import { useSession } from "next-auth/react";

const Videos: FC = () => {
  const [url, setUrl] = useState("");
  const [videos, setVideos] = useState<IVideo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const getVideos = async () => {
      const { data } = await axios.get<{ videos: IVideo[] }>("/api/video");
      setVideos(data.videos);
    };
    getVideos();
  }, []);

  const deleteVideoHandler = async (id: string) => {
    await axios.delete<{ id: string }>("api/video", { data: { id } });
    setVideos((prevVideos) => (prevVideos ? prevVideos.filter((video) => video.id !== id) : null));
  };

  const sendVideoHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (url) {
      setLoading(true);

      const { data } = await axios.put<IVideo>("/api/video", { url });
      setVideos((prevVideos) => [{ ...data }, ...(prevVideos ? prevVideos : [])]);
      setUrl("");
      setLoading(false);
    }
  };

  return (
    <div className={classes.videos}>
      {videos ? (
        <>
          {session && (
            <form onSubmit={sendVideoHandler}>
              <input type="text" required value={url} placeholder="ID filmu" onChange={(e) => setUrl(e.target.value)} />
              {loading ? <Button disabled>Dodawanie filmu...</Button> : <Button disabled={!url}>Dodaj film</Button>}
            </form>
          )}
          <div className={classes.content}>
            {videos.map((video) => (
              <div key={video.id} className={classes.video}>
                <YouTube videoId={video.url} />
                {session && (
                  <div className={classes.actions}>
                    <ConfirmButton onConfirm={() => deleteVideoHandler(video.id)}>Usuń video</ConfirmButton>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <Loader>Wczytywanie filmów...</Loader>
      )}
    </div>
  );
};

export default Videos;
