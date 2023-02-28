import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Navbar from "../navbar/Navbar";
import img from "../../assets/landingpage571_640.png";
import "./LandingPage.css";

export default function LandingPage() {
	return (
		<Container className="py-2">
			<Navbar />
			<Row>
				<Col lg={6} md={6} sm={12}>
					<div className="text-center">
						<h1 className="py-4">Epuls</h1>
						<p>Stwórz swoją własną sieć kontaktów i podziel się przeżyciami</p>
					</div>
				</Col>
				<Col lg={6} md={6} sm={12} className="p-5">
					<Image src={img} className="img-fluid" />
				</Col>
			</Row>
		</Container>
	);
}
