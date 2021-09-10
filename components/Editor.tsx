import AceEditor, { IAceEditorProps } from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-twilight";

const Editor: React.FC<IAceEditorProps> = (props: IAceEditorProps) => (
  <AceEditor theme="twilight" {...props} />
);

export default Editor;
