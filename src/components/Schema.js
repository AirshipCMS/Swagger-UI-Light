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
    <div>
      <p>{ schemaRef } &#123;</p>
      <div class="schema-object">
        { Object.keys(definitions[schemaRef].properties).map( property =>
          <p>{ property } ({ definitions[schemaRef].properties[property].type }, { definitions[schemaRef].properties[property].required ? "reqired" : "optional" })</p>
        ) }
      </div>
      <p>&#125;</p>
    </div>
  );
}
