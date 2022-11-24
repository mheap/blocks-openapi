import { FileBlockProps, getLanguageFromFilename } from "@githubnext/blocks";
import { API } from '@stoplight/elements';
//import '@stoplight/elements/styles.min.css';


export default function (props: FileBlockProps) {
  const { context, content } = props
  const url = ["https://raw.githubusercontent.com", context.owner, context.repo, "main", context.path].join("/");
  return <API
    apiDescriptionUrl={url}
  />
}