import Inferno from 'inferno';
import Schema from './Schema';

export default function PathDetail({ className, path, definitions }){
  const {
    consumes,
    produces,
    parameters,
    responses,
    tags
  } = path.definition;

  return (
    <div className={ className }>
      {
        ( path.definition.description ) ? (
          <div class="implementation-notes">
            <p>Implementation Notes</p>
            <p>{ path.definition.description }</p>
          </div>
        ) : null
      }
      {
        (consumes) ? (
          <div>
            <p>Consumes</p>
            <p>{ consumes.join(" | ") }</p>
          </div>
        ) : null
      }
      {
        (produces) ? (
          <div>
            <p>Produces</p>
            <p>{ produces.join(" | ")  }</p>
          </div>
        ) : null
      }
      {
        ( parameters ) ? (
          <div>
            <p>Parameters</p>
            { parameters.map( param =>
              <div class="parameters">
                <p>Parameter Type: { param.in }</p>
                {
                  ( param.description ) ? (
                    <p>{ param.description }</p>
                  ) : null
                }
                {
                  ( param.type ) ? (
                    <p>Data Type: { param.type }</p>
                  ) : null
                }
                {
                  ( param.schema ) ? (
                    <p>Data Type:</p>
                  ) : null
                }
                {
                  ( param.schema ) ? (

                    <div class="schema">
                      <Schema schema={ param.schema } definitions={ definitions }/>
                    </div>
                  ) : null
                }
                {
                  ( param.default !== undefined ) ? (
                    <p>Default Value:</p>
                  ) : null
                }
                {
                  ( param.default !== undefined ) ? (
                    <div class="schema">
                      <pre class="language-javascript">
                        <code class="language-javascript">
                          { param.default }
                        </code>
                      </pre>
                    </div>
                  ) : null
                }
              </div>
            ) }
          </div>
        ) : null
      }
    </div>
  );
}
