import Inferno from 'inferno';

export default function Schema({ schema, definitions }){

  const schemaRef = schema.$ref.split("definitions/")[1];
  Object.keys( definitions[schemaRef].properties ).map(( property ) => {
    if( definitions[schemaRef].properties[property].hasOwnProperty("$ref") ) {
      definitions[schemaRef].properties[property].type = definitions[schemaRef].properties[property].$ref.split("definitions/")[1];
      definitions[schemaRef].properties[property].required = false;
    }
    if( definitions[schemaRef].hasOwnProperty("required") ) {
      Object.keys( definitions[schemaRef].required ).map(( item ) => {
        if( property === definitions[schemaRef].required[item] ) {
          definitions[schemaRef].properties[property].required = true;
        }
      });
    }
  });

  return (
    <pre class="language-javascript">
      <code class="language-javascript">{ schemaRef } &#123;</code>
      <code class="schema-object language-javascript">
        { Object.keys(definitions[schemaRef].properties).map( property =>
          <pre>
            <code class="language-javascript">{ property } ({ definitions[schemaRef].properties[property].type }, { definitions[schemaRef].properties[property].required ? "reqired" : "optional" })</code>
          </pre>
        ) }
      </code>
      <span>&#125;</span>
    </pre>
  );
}
