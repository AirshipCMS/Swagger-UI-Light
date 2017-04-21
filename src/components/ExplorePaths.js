import Inferno from 'inferno';
import Path from './Path';

export default function ExplorePaths({ paths, definitions, className, pathsExpandedClass, pathsExpanded }){
  return (
    <ul className={ className }>
      { Object.keys(paths).map( path =>
        <Path
          className={ pathsExpandedClass }
          pathName={path}
          path={paths[path]}
          pathsExpanded={ pathsExpanded }
          definitions={definitions} />
      ) }
    </ul>
  );
}

