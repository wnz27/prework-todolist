import React, { useState } from 'react';
import { Button } from 'antd';
import logo from './logo.svg';
import './App.css';
import SiderDemo from './layouts/BasicLayout'
import { getTaskListByDeadline } from './requestData/MyRequestByAxios'
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'


const baseURL = 'http://127.0.0.1:8000'
/*
<div>
      <Get url={`${baseURL}/task/list/1`}>
        {(error, response, isLoading, onReload) => {
          if(error) {
            return (<div>Something bad happened: {error.message} <button onClick={() => onReload({ params: { reload: true } })}>Retry</button></div>)
          }
          else if(isLoading) {
            return (<div>Loading...</div>)
          }
          else if(response !== null) {
            return (
              <div>
              <ul>
                {response.data.map((item) => {
                  return(
                    <li>{item['fields']['title']}</li>
                  )
                })}
              </ul>
              <button onClick={() => onReload({ params: { refresh: true } })}>Refresh</button>
              </div>)
          }
          return (<div>Default message before request is made.</div>)
        }}
      </Get>
    </div>
*/
const App = () => (
  <div className="App">
    <SiderDemo />
  </div>
);

export default App;
