import AceEditor, { IAceEditorProps } from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-twilight";

const Editor: React.FC<IAceEditorProps> = (props: IAceEditorProps) => (
  <AceEditor {...props} />
);

export default Editor;
