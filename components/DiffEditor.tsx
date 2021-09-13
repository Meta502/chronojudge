import { IDiffEditorProps, diff as AceEditor } from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-merbivore_soft";

const DiffEditor: React.FC<IDiffEditorProps> = (props: IDiffEditorProps) => (
  <AceEditor theme="merbivore_soft" {...props} />
);

export default DiffEditor;
