import { FileBlockProps, getLanguageFromFilename } from "@githubnext/blocks";
import Lincoln from 'react-lincoln'

import * as yaml from "js-yaml";

export default function (props: FileBlockProps) {
  const { context, content } = props
  const language = Boolean(context.path) ? getLanguageFromFilename(context.path) : "N/A";

  let spec;
  if (language == "YAML") {
    spec = yaml.load(content) as object;
  } else if (language == "JSON") {
    spec = JSON.parse(content);
  }

  return <Lincoln definition={spec} />
}
