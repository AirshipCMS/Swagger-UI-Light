import Inferno from 'inferno';
import Schema from './Schema';

export default function PathDetail({ className, method, path, definitions }){
  const {
    consumes,
    produces,
    parameters,
    responses,
    tags
  } = path[method];

  return (
    <div className={ className }>
      {
        ( parameters ) ? (
          <dl>
            <dt>Parameters</dt>
            <dd>
              <ul>
                { parameters.map( param =>
                  <li>
                    <dl>
                      <dt>Name</dt>
                      <dd>{ param.name }</dd>
                      <dt>In</dt>
                      <dd>{ param.in }</dd>
                      <dt>Required</dt>
                      <dd>{ param.required.toString() }</dd>
                      {
                        ( param.type ) ? (
                          <dl>
                            <dt>Type</dt>
                            <dd>
                              { param.type }
                            </dd>
                          </dl>
                        ) : null
                      }
                      {
                        ( param.schema ) ? (
                          <dl>
                            <dt>Schema</dt>
                            <dd>
                              <Schema schema={ param.schema } />
                            </dd>
                          </dl>
                        ) : null
                      }
                      {
                        ( param.default !== undefined ) ? (
                          <dl>
                            <dt>Default</dt>
                            <dd>
                              { param.default }
                            </dd>
                          </dl>
                        ) : null
                      }
                    </dl>
                  </li>
                ) }
              </ul>
            </dd>
          </dl>
        ) : null
      }
    </div>
  );
}


