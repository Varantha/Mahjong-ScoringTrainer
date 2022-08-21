import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <div class="row">
        <div class="col-2 border m-4">
        <div class="card">
          <div class="card-body h-100 infoPanel infoPanelBorder">
          </div>
          </div>
        </div>
        <div class="col-9 border m-4">
          <div class="row">
            <div class="col border m-4">
              <div class="card">
                <div class="card-body h-100 tilePanel">
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-3 border m-5">test</div>
            <div class="col-7 border m-5">test</div>
          </div>

        </div>
      </div>
        
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
    </div>
  
  );
}

export default App;
