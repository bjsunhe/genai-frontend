import React, { useState, useEffect, useRef } from "react";
import "./Palletizer.css";
import AnswerList from "../AnswerList/AnswerList";

import { Input, Space, Button } from "antd";
import { Form } from "antd";
import { Menu } from "antd";

import { useHistory } from "react-router-dom";



const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};


const Palletizer = () => {

  const [questionList, setQuestionList] = useState([]);




  function containsHttp(url) {
    const httpRegex = /http(s)?:\/\//;
    return httpRegex.test(url);
}
  const onFinish = (values) => {
    console.log(values.ask.toString());
    async function processCount(sql,previousQuestions) {
      // const materials=await fetch('http://localhost:8090/api/material-delivery/find-material-by-materialid',{
        console.log(previousQuestions)

      const process = await fetch(
        "http://localhost:8090/api/ai/run-sql",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            sql,
            previousQuestions
          }),
        }
      );

      return process.json();
    }

    processCount(values.ask.toString(),questionList.map(q=>q.question)).then((data) => {
      console.log(data);
      

      setQuestionList([
        { question: values.ask.toString(), answer: JSON.stringify(data.result) },
        ...questionList
        
      ]);

      if(containsHttp(data.result[0][Object.keys(data.result[0])[0]])){
        window.open(data.result[0][Object.keys(data.result[0])[0]], '_blank', 'noopener,noreferrer');
      }
    });
    
  };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("Navigation", "sub1", null, [
      getItem(
        "Palletizer",
        "/",
        null,
        
      ),
      getItem(
        "Round Cylinder",
        "/round-cylinder",
        null,
        
      )
      
    ])
  ];
  
  const history=useHistory()
  const onClick = (e) => {
    console.log("click ", e);
    history.push(e.key)
  };



  return (
    <>
    <Menu
            onClick={onClick}
            style={{
              width: 256,
              position:'absolute',
              top:50,
              left:50,
              zIndex:10001
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
      <h1>BMG Function Finder - GenAI</h1>
      
      <div id="search-container">
        <div id="search-control">
        
          <Space direction="vertical">
            <Form
              {...layout}
              name="nest-messages"
              onFinish={onFinish}
              style={{
                width: 900,
                height:600,
                
              }}
            >
              <Form.Item  label="ASK"  name="ask">
                <Input.TextArea rows={20}/>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  ...layout.wrapperCol,
                  offset: 8,
                }}
              >
                <Button type="primary" htmlType="submit">
                  GenAI
                </Button>
              </Form.Item>
            </Form>
          </Space>
          
        </div>

        <div id="search-result">
          

{
  questionList.map(question=>(<AnswerList question={question} />))
}

          
        </div>
      </div>
    </>
  );
};

export default Palletizer;
