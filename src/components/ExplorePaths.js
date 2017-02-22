import Inferno from 'inferno';

export default function ExplorePaths({ paths, definitions }){
  return (
    <ul>
      { Object.keys(paths).map( path =>
        <li>
          { path }
        </li>
      ) }
    </ul>
  );
}

