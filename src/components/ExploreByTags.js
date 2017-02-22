import Inferno from 'inferno';
import ExplorePaths from './ExplorePaths';

export default function ExploreByTags ({ tags, definitions, paths }){
  return (
    <div>
      { tags.map( tag =>
        <section>
          <h2>{ tag.description } <small>[{ tag.name }]</small></h2>
          <ExplorePaths
            definitions={definitions}
            paths={Object.keys(paths).filter( path =>
              Object.keys(paths[path]).some( method =>
                paths[path][method].tags.indexOf(tag.name) >= 0
              )
            ).reduce((pathsDict, taggedPath) => Object.assign(pathsDict,{[taggedPath]:paths[taggedPath]}), {})} />
        </section>
      ) }
    </div>
  );
}

