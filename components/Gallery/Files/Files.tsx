import { FC } from "react";
import { IFile } from "../../../interfaces/file";
import classes from "./Files.module.scss";

interface Props {
  files: IFile[];
}

const Files: FC<Props> = ({ files }) => (
  <div className={classes.files}>
    <div className={classes.header}>
      <div className={classes.cell}>Nazwa pliku</div>
      <div className={classes.cell}>Status</div>
    </div>
    <div className={classes.content}>
      {files.map((file) => (
        <div className={classes.file} key={file.content.name}>
          <div className={classes.cell}>{file.content.name}</div>
          <div className={classes.cell}>{file.status} %</div>
        </div>
      ))}
    </div>
  </div>
);

export default Files;
