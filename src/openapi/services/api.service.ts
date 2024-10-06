import { Injectable } from '@nestjs/common';
import { ScalarOptions } from '@/openapi/schemas/ScalarOptions';

@Injectable()
export class ApiService {
  renderHTML(path: string, options: ScalarOptions): string {
    const data = btoa(options.toJSON());
    return `
      <!doctype html>
      <html lang="en">
          <head>
              <title>${options.title}</title>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
          </head>
          <body>
              <script id="api-reference" data-url="${path}"></script>
              <script>
                  function main() {
                    const reference = document.getElementById('api-reference');
                    if (typeof reference?.['dataset'] === 'object') {
                      reference.['dataset'].configuration = atob('${data}');
                    }
                  }
                  
                  let called = false;
                  function preload() {
                    if (!called && document.readyState === 'complete') {
                      called = true;
                      main();
                    }
                  }
                  
                  window.addEventListener('load', preload);
                  document.addEventListener('load', preload);
                  document.addEventListener('DOMContentLoaded', preload);
              </script>
              <script src="/js/scalar.api-reference.js"></script>
          </body>
      </html>
    `;
  }
}
