import React, { Component } from 'react';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs/internal/types';
import { map } from 'rxjs/operators';
import logo from './logo.svg';
import './App.css';

export type AppState = {
  message: string,
  tornDown: boolean
}

class App extends Component<{}, AppState> {
  state = {message: '', tornDown: false}

  componentDidMount() {
    const observable = new Observable<string>(
      (obs: Observer<string>) => {
        obs.next('called next');

        return () => {
          this.setState(state => {
            return {
              ...state,
              tornDown: true
            }
          });
        }
    });

    const sub$ = observable
     // .pipe(map(x => x))
      .subscribe((x: string) => {
      this.setState(state => {
        return {
          ...state,
          message: x
        }
      })
    });
    sub$.unsubscribe();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Torndown: {this.state.tornDown ? '👍' : '👎'}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
