import React from 'react';
import conf from './conf/conf'
function App() {
  console.log(conf.appwrite_collection_id);
  return (
    <div className="App">
      <h1 className="text-center text-3xl font-bold mt-5">Redux Counter</h1>
    </div>
  );
}

export default App;
