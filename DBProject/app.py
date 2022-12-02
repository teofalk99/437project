########  imports  ##########
from flask import Flask, render_template, request
import mysql.connector
import json

app = Flask(__name__)

 
mydb = mysql.connector.connect(
  host= 'localhost',
  user= 'root',
  password='Imaluigi99',
  database='Food'
)


mycursor = mydb.cursor()


@app.route("/")
def hello():
    print('launched site')
    return render_template('index.html')

@app.route("/submit", methods=["POST"])
def search():
    #QUERY DATABASE HERE, RETURN RESULTS
    print("RECEIVED ???")

    data = json.loads(request.form.get('data'))

    print(data['recipe_name'])
    
    mycursor.execute("SELECT * FROM fullRecipes WHERE title LIKE '%%pasta%%';")
    myresult = mycursor.fetchall()

    print(data, myresult)
    
    return json.dumps({'success': True, 'data': data}), 200, {"ContentType": "application/json"}



  
if __name__ == "__main__":
    app.run(host="localhost", port=8001, debug=True)
