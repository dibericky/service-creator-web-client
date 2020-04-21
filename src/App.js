import React, {Component} from 'react';
import axios from 'axios'
import {Result} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'

import InitForm from './components/InitForm'
import RoutesForm from './components/RoutesForm'
import Overview from './components/Overview.js'
import Dependencies from './components/Dependecies';

const STEPS = {
  init: 'INIT',
  routes: 'ROUTES',
  overview: 'OVERVIEW',
  result: 'RESULT'
}

class App extends Component {
  state = {
    basicInfo: {},
    step: STEPS.init,
    routes: [],
    isLoading: false,
    additionalDependencies: []
  }

  onInitSubmit = (values) => {
    const {branch, repoName, user, isToInit} = values
    if (!isToInit) {
      this.setState({
        basicInfo: {branch, repoName, user},
        step: STEPS.routes
      })
      return
    }
    this.setState({isLoading: true})
    axios.post('/api/init', {
      user,
      repoName,
      branch,
    }).then(() => {
      this.setState({
        isLoading: false,
        basicInfo: {branch, repoName, user},
        step: STEPS.routes
      })
    }, () => {
      this.setState({
        isLoading: false,
        step: STEPS.result,
        result: 'error'
      })
    })
  }

  onRoutesSubmit = (values) => {
    this.setState({
      routes: values.routes,
      step: STEPS.overview
    })
  }

  renderInit() {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <InitForm onSubmit={this.onInitSubmit} />
      </div>
    )
  }

  onAddDependency = ({name, version}) => {
    this.setState(state => ({
      additionalDependencies: state.additionalDependencies.concat([{name, version}])
    }))
  }

  onRemoveDependency = (name) => {
    this.setState(state => ({
      additionalDependencies: state.additionalDependencies.filter(dep => dep.name !== name)
    }))
  }
  renderRoutes () {
    const {additionalDependencies} = this.state
    return (
      <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', height: '100%', overflow: 'hidden'}}>
        <div style={{overflow: 'auto'}}>
          <RoutesForm onSubmit={this.onRoutesSubmit} />
        </div>
        <div style={{padding: 10}}>
          <Dependencies
            onAdd={this.onAddDependency}
            onRemove={this.onRemoveDependency}
            dependencies={additionalDependencies}
          />
        </div>
      </div>
    )
  }

  onConfirm = ({message}) => {
    const {basicInfo: {repoName, user, branch}, routes, additionalDependencies} = this.state
    this.setState({isLoading: true})

    axios.post('/api/routes', {
      user,
      repoName,
      routes,
      branch,
      message,
      additionalDependencies
    }).then(() => {
      this.setState({
        isLoading: false,
        step: STEPS.result,
        result: 'success'
      })
    }, () => {
      this.setState({
        isLoading: false,
        step: STEPS.result,
        result: 'error'
      })
    })
  }

  renderOverview() {
    const {basicInfo: {repoName, user}, routes} = this.state
    return(
      <Overview 
        user={user} 
        routes={routes} 
        repoName={repoName} 
        onConfirm={this.onConfirm}
      />)
  }

  renderResult() {
    const {result} = this.state
    if (result === 'loading') {
      
    }
    return(
      <Result
        status={result}
        title={result === 'success' ? 'Success!' : 'Error!'}
      />
    )
  }

  renderStep(step) {
    switch(step) {
      case STEPS.init: {
        return this.renderInit()
      }
      case STEPS.routes:
        return this.renderRoutes()
      case STEPS.overview:
        return this.renderOverview()
      case STEPS.result:
      default: {
        return this.renderResult()
      }
    }
  }

  render() {
    const {step, isLoading} = this.state
    return (
      <div className="App">
          {
            !isLoading ? 
              this.renderStep(step) :
              (
                <Result
                  icon={<LoadingOutlined />}
                  title={'Loading...'}
                />
              )
          }
      </div>
    );
  }
}

export default App;
