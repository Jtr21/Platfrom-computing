import mainpicture from './platform computing hwk1.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
       <header>
        <h1> About Juan Trujillo </h1>   
    </header>
    
    <div class="mypic">
        <img src={mainpicture} alt="mainpic"/>
    </div>

    <div class="p1">
        <p>
            <h1>This is my last semester at csusb. When I graduate I want to get a good job, hopefully as an engineer.</h1>
        </p>
    </div>

    <div class="p2">
        <p>
            <h2>
                I like to play say soccer or go offroading during my freetime. 
                When i used to play comptitive soccer I got the chance to try out and get scouted by teams in mexico.
                I will also use the lorem ipson generator to fill up this space.
                Lorem ipsum dolor sit amet, at hinc rebum nobis mel, ius ei natum
                soleat honestatis, ei minimum adversarium pro. Ius an alterum alienum adversarium, 
                ad sed dicunt menandri. Mei id insolens urbanitas. Ut nihil decore iuvaret nam, tale prompta at duo. 
                An vim epicuri consequuntur, modo euismod argumentum nam te. 
            </h2>
        </p>
    </div>

    <div class="p3">
        <p>
            <h2>
                I ran out of things to say So I will use lorem ipson genrator to make up for the rest.
                Lorem ipsum dolor sit amet, at hinc rebum nobis mel, ius ei natum
                 soleat honestatis, ei minimum adversarium pro. Ius an alterum alienum adversarium, 
                 ad sed dicunt menandri. Mei id insolens urbanitas. Ut nihil decore iuvaret nam, tale 
                 prompta at duo. An vim epicuri consequuntur, modo euismod argumentum nam te. 
            </h2>
        </p>
    </div>
    <footer>
        <h1>
            This concludes my assignment.
            <a href=" "></a>
        </h1>
    </footer>
    </div>
  );
}

export default App;
