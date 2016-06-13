from flask import Flask
app = Flask(__name__)
app.config.from_object(__name__) # name is the name of the project. SInce there is only one module we direct the configuration to this file

import os
import sqlite3
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash

@app.route('/')
def index():
	print ("Try to access index page")
	return render_template('index.html')

@app.route('/project')
def project():
	print ("Try to access project page")
	return render_template('project.html')

@app.route('/soccerpoll')
def soccerpoll():
	print ("Try to access soccerpoll page")
	return render_template('soccerpoll.html')

@app.route('/phaser')
def phaser():
	print ("Try to access phaser page")
	return render_template('phaser.html')