import { FileBlockProps, getLanguageFromFilename } from "@githubnext/blocks";
import { useEffect } from 'react';
import { RedocStandaloneProps } from 'redoc';

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
  return (
    <div>
      <RedocStandalone spec={spec} />
    </div>
  )
}

declare const Redoc: any;

async function loadScript(scriptSrc: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptSrc;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function RedocStandalone({ spec, specUrl, options, onLoaded }: RedocStandaloneProps) {
  useEffect(() => {
    async function setupRedoc() {
      if (typeof Redoc === 'undefined') await loadScript('https://cdn.jsdelivr.net/npm/redoc@latest/bundles/redoc.standalone.js');

      Redoc.init(spec || specUrl, options, document.getElementById('redoc-container'), onLoaded);
    }

    setupRedoc();
  });

  return <div id="redoc-container" data-testid="redoc-container" />;
}