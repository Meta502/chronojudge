import AceEditor, { IAceEditorProps } from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-merbivore_soft";

const Editor: React.FC<IAceEditorProps> = (props: IAceEditorProps) => (
  <AceEditor theme="merbivore_soft" {...props} />
);

export default Editor;
