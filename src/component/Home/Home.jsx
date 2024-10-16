import React,{useEffect} from 'react'
import "./Home.css"
import * as THREE from "three"
import moonImage from "../../Images/moon.jpg"
import venusImage from "../../Images/venus.jpg"
import spaceImage from "../../Images/space.jpg"
import java from "../../Images/java.png"
import html from "../../Images/html.png"
import css from "../../Images/css.png"
import javascript from "../../Images/javascript.png"
import react from "../../Images/react.png"
import hibernate from "../../Images/hibernate.png"
import sql from "../../Images/sql.png"
import { Typography } from "@mui/material";
import { FaJava } from "react-icons/fa";
import {
  SiReact,
  SiMysql,
  SiJavascript,
  SiHibernate,
  SiCss3,
  SiHtml5,
  SiThreedotjs,
} from "react-icons/si";
import { Link } from "react-router-dom";
import { MouseOutlined } from "@mui/icons-material";

const Home = ({ timelines, skills }) => {

useEffect(() => {

  const textureLoader = new THREE.TextureLoader();

  const moonTexture = textureLoader.load(moonImage);
  const venusTexture = textureLoader.load(venusImage);
  const spaceTexture = textureLoader.load(spaceImage);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(4, 4, 8);

  const canvas = document.querySelector(".homeCanvas");
  const renderer = new THREE.WebGLRenderer({ canvas });

  const moonGeometry = new THREE.SphereGeometry(2, 64, 64);
  const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
  const moon = new THREE.Mesh(moonGeometry, moonMaterial);

  const venusGeometry = new THREE.SphereGeometry(3, 64, 64);
  const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
  const venus = new THREE.Mesh(venusGeometry, venusMaterial);
  venus.position.set(8, 5, 5);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  const pointLight2 = new THREE.PointLight(0xffffff, 0.1);

  pointLight.position.set(8, 5, 5);
  pointLight2.position.set(-8, -5, -5);

  scene.add(moon);
  scene.add(venus);
  scene.add(pointLight);
  scene.add(pointLight2);
  scene.background = spaceTexture;

  const constSpeed = 0.01;
  window.addEventListener("mousemove", (e) => {
    if (e.clientX <= window.innerWidth / 2) {
      moon.rotation.x -= constSpeed;
      moon.rotation.y += constSpeed;
      venus.rotation.x -= constSpeed;
      venus.rotation.y += constSpeed;
    }

    if (e.clientX > window.innerWidth / 2) {
      moon.rotation.x -= constSpeed;
      moon.rotation.y -= constSpeed;
      venus.rotation.x -= constSpeed;
      venus.rotation.y -= constSpeed;
    }

    if (e.clientY > window.innerHeight / 2) {
      moon.rotation.x -= constSpeed;
      moon.rotation.y += constSpeed;
      venus.rotation.x -= constSpeed;
      venus.rotation.y += constSpeed;
    }

    if (e.clientY <= window.innerHeight / 2) {
      moon.rotation.x -= constSpeed;
      moon.rotation.y -= constSpeed;
      venus.rotation.x -= constSpeed;
      venus.rotation.y -= constSpeed;
    }
  });

  const animate = () => {
    requestAnimationFrame(animate);
    moon.rotation.y += 0.001;
    venus.rotation.y += 0.001;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  };
animate();
  
return window.addEventListener("scroll", () => {
  camera.rotation.z = window.scrollY * 0.001;
  camera.rotation.y = window.scrollY * 0.003;

  const skillsBox = document.getElementById("homeskillsBox");

  if (window.scrollY > 1500) {
    skillsBox.style.animation = 'homeskillsBoxAnimationOn';
  } else {
    skillsBox.style.animation = "homeskillsBoxAnimationOff";
  }
});
}, [])


  return (
    <div className="home">
    <canvas className="homeCanvas"></canvas>

    <div className="homeCanvasContainer">
      <Typography variant="h1">
        <p>R</p>
        <p>A</p>
        <p>H</p>
        <p>U</p>
        <p>L</p>
      </Typography>

      <div className="homeCanvasBox">
        <Typography variant="h2">JAVA</Typography>
        <Typography variant="h2">DEVELOPER</Typography>
      </div>

      <Link to="/projects">VIEW WORK</Link>
      </div>

      <div className="homeScrollBtn">
        <MouseOutlined />
      </div>

      <div className="homeContainer">
        <Typography variant="h3">Objective</Typography>
        <p>To obtain a challenging role as a software developer in a reputable
          organization where I can utilize my technical skills and knowledge to
          contribute to the development of innovative software solutions.
</p>
      </div>

      <div className="homeSkills">
        <Typography variant="h3">SKILLS</Typography>

      <div className="homeCubeSkills">
      <div className="homeCubeSkillsFaces homeCubeSkillsFace1">
            <img src={java} alt="Face1" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace2">
            <img src={html} alt="Face2" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace3">
            <img src={css} alt="Face3" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace4">
            <img src={javascript} alt="Face4" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace5">
            <img src={react} alt="Face5" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace6">
            <img src={sql} alt="Face6" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace7">
            <img src={hibernate} alt="Face7" />
          </div>
      </div>

     <div className="cubeShadow"></div>
          
      <div className="homeskillsBox" id="homeskillsBox">
        <FaJava />
        <SiHtml5 />
        <SiCss3 />
        <SiJavascript />
        <SiHibernate />
        <SiReact />
        <SiMysql />
        <SiThreedotjs />
      </div>
      </div>
</div>
  )
}

export default Home