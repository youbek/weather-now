#!/usr/bin/env node
import { WeatherApi } from "./api/WeatherApi";
import { Program } from "./program/Program";

const weatherApi = new WeatherApi();

const program = new Program(weatherApi);

program.start();
