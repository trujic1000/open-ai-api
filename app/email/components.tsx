"use client"

import {
  Column,
  Img,
  Row,
  Text,
  Section,
  Button,
} from "@react-email/components"
import React from "react"

export const RowWithImage = ({
  title = "",
  buttonLink = "",
  text,
  imageUrl,
  buttonText = "Click here",
}) => {
  const textColumnStyle = {
    flex: 1,
    color: "#fff",
    fontSize: "16px",
    width: "80%",
    verticalAlign: "top",
  }

  const imageColumnStyle = {
    flex: 1,
    width: "30%",
  }

  const button = {
    paddingTop: "10px",
    backgroundColor: "#A1FFE0",
    borderRadius: "10px",
    color: "#101018",
    fontSize: "18px",
    fontWeight: 500,
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    width: "230px",
    height: "40px",
  }

  const titleStyle = {
    color: "#fff",
    textAlign: "left" as const,
    fontSize: "20px",
    fntWeight: "600",
  }

  const rowStyle = {
    display: "flex",
    marginTop: "20px",
    marginBottom: "60px",
    paddingRight: "12px",
  }

  const imageStyle = {
    maxWidth: "100%",
    height: "auto",
  }

  return (
    <Row style={rowStyle}>
      <Text style={titleStyle}>{title}</Text>
      <Text style={textColumnStyle}>{text}</Text>
      <Section>
        <Button style={button} href={buttonLink}>
          {buttonText}
        </Button>
      </Section>
      <Column style={imageColumnStyle}>
        <Img
          src={imageUrl}
          width={248}
          height={138}
          alt="Image"
          style={imageStyle}
        />
      </Column>
    </Row>
  )
}
