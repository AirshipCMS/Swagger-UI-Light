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
            <h4>Implementation Notes</h4>
            <p>{ path.definition.description }</p>
          </div>
        ) : null
      }
      {
        ( parameters ) ? (
          <div>
            <h4>Parameters</h4>
            { parameters.map( param =>
              <div class="parameters">
                <p>{ param.in }</p>
                {
                  ( param.description ) ? (
                    <p>{ param.description }</p>
                  ) : null
                }
                {
                  ( param.type ) ? (
                    <p>Parameter Type: { param.type }</p>
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
                      <div>
                        { param.default }
                      </div>
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
