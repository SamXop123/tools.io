from flask import Flask, render_template, request, redirect, jsonify, session, flash, send_file, url_for
from flask_cors import CORS
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from gtts import gTTS
import qrcode
from PIL import Image
from io import BytesIO
import requests
import random
import string
import io

app = Flask(__name__) 
app.secret_key = "supersecretkey"
CORS(app)
users_db = {}


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/tools.html')
def tools():
    return render_template('tools.html')


@app.route('/bg_remove.html', methods=['GET', 'POST'])
def bg_remove():
    if request.method == 'POST':
        file = request.files['image']
        img = Image.open(file.stream)

        # Removes the background
        output = remove(img)

        # Save the image to a BytesIO object
        img_byte_arr = io.BytesIO()
        output.save(img_byte_arr, format="PNG")
        img_byte_arr.seek(0)

        return send_file(img_byte_arr, as_attachment=True, download_name="output.png")

    return render_template('bg_remove.html')


@app.route('/ip_finder.html', methods=['GET', 'POST'])
def ip_finder():
    if request.method == 'POST':
        option = request.form.get('option')
        
        if option == 'know_your_ip':
            # Display the user's IP
            user_ip = request.remote_addr
            return render_template('ip_finder.html', ip=user_ip, location=None, show_ip=True)
        
        elif option == 'custom_ip':
            # Extracting location of a custom IP
            custom_ip = request.form.get('custom_ip')
            response = requests.get(f"https://ipinfo.io/{custom_ip}/json")
            if response.status_code == 200:
                data = response.json()
                location = {
                    "IP": data.get("ip"),
                    "City": data.get("city"),
                    "Region": data.get("region"),
                    "Country": data.get("country"),
                    "Latitude and Longitude": data.get("loc"),
                    "Organization": data.get("org"),
                }
            else:
                location = None  # Handle any invalid IP
            return render_template('ip_finder.html', ip=None, location=location, show_ip=False)

    return render_template('ip_finder.html', ip=None, location=None, show_ip=False)


@app.route('/random_number.html', methods=['GET', 'POST'])
def random_number():
    if request.method == 'POST':
        digits = request.form.get('digits', type=int)
        if digits and digits > 0:
            min_num = 10**(digits - 1)
            max_num = (10**digits) - 1
            random_num = random.randint(min_num, max_num)
            return render_template('random_number.html', random_num=random_num, digits=digits)
        else:
            error = "Please enter a valid number of digits greater than 0."
            return render_template('random_number.html', random_num=None, error=error)
    return render_template('random_number.html', random_num=None)


@app.route('/compress.html', methods=['GET', 'POST'])
def compress_image():
    if request.method == 'POST':
        file = request.files['image']
        image = Image.open(file)
        buffer = io.BytesIO()
        image_format = "JPEG" if file.filename.endswith(".jpg") or file.filename.endswith(".jpeg") else "PNG"
        image.save(buffer, format=image_format, quality=50)  # 50% compression for JPEG, no quality param for PNG
        buffer.seek(0)

        # Saves the file temporarily for download
        compressed_image_path = "static/compressed_image." + image_format.lower()
        with open(compressed_image_path, "wb") as f:
            f.write(buffer.getbuffer())

        return render_template(
            'compress.html', 
            success=True, 
            download_url="/" + compressed_image_path
        )
    return render_template('compress.html', success=False)


@app.route('/password_generator.html', methods=['GET', 'POST'])
def password_generator():
    if request.method == 'POST':
        length = int(request.form['length'])
        include_symbols = 'symbols' in request.form
        chars = string.ascii_letters + string.digits
        if include_symbols:
            chars += string.punctuation
        password = ''.join(random.choices(chars, k=length))
        return render_template('password_generator.html', password=password)
    return render_template('password_generator.html')


@app.route('/text_to_speech.html', methods=['GET', 'POST'])
def text_to_speech():
    if request.method == 'POST':
        text = request.form['text']
        tts = gTTS(text)
        file_path = "static/output.mp3"
        tts.save(file_path)
        
        # To Provide the file's URL to the template:
        audio_url = url_for('static', filename='output.mp3')
        return render_template('text_to_speech.html', audio_url=audio_url)
    
    return render_template('text_to_speech.html')


@app.route('/qr_generator.html', methods=['GET', 'POST'])
def qr_generator():
    if request.method == 'POST':
        data = request.form['qr_text']
        qr_img = qrcode.make(data)
        buffer = BytesIO()
        qr_img.save(buffer, 'PNG') 
        buffer.seek(0)
        return send_file(buffer, mimetype='image/png')
    return render_template('qr_generator.html')


@app.route('/word_counter.html', methods=['GET', 'POST'])
def word_counter():
    word_count = None
    char_count_with_spaces = None
    char_count_without_spaces = None

    if request.method == 'POST':
        text = request.form.get('text', '')
        words = text.strip().split()
        word_count = len(words)
        char_count_with_spaces = len(text)
        char_count_without_spaces = len(text.replace(' ', ''))

    return render_template(
        'word_counter.html',
        word_count=word_count,
        char_count_with_spaces=char_count_with_spaces,
        char_count_without_spaces=char_count_without_spaces
    )


@app.route('/games.html')
def games():
    return render_template('games.html')


@app.route('/guess.html', methods=['GET', 'POST'])
def guessing_game():
    if request.method == 'POST':
        # Handles the guess and session logic here
        guess = int(request.json.get('guess', 0))
        secret_number = session.get('secret_number', None)
        
        if not secret_number:
            secret_number = random.randint(1, 100)
            session['secret_number'] = secret_number
        
        if guess < secret_number:
            return jsonify({'result': 'low'})
        elif guess > secret_number:
            return jsonify({'result': 'high'})
        else:
            session.pop('secret_number', None)  # Resets the game
            return jsonify({'result': 'correct'})
    
    return render_template('guess.html')
    

@app.route("/snake_water_gun.html", methods=["GET", "POST"])
def snake_water_gun():
    if request.method == "POST":
        user_choice = request.form["choice"].lower()
        game = ["snake", "water", "gun"]
        computer_choice = random.choice(game)

        result = ""
        if user_choice == computer_choice:
            result = "Draw!"
        elif (user_choice == "snake" and computer_choice == "water") or \
             (user_choice == "water" and computer_choice == "gun") or \
             (user_choice == "gun" and computer_choice == "snake"):
            result = "You won!"
        else:
            result = "Computer wins!"
        
        return render_template("snake_water_gun.html", result=result, user_choice=user_choice, computer_choice=computer_choice)

    return render_template("snake_water_gun.html", result=None)

@app.route('/tictactoe.html')
def tictactoe():
    return render_template('tictactoe.html')

@app.route('/match.html')
def memory_match():
    return render_template('match.html')

@app.route('/snake.html')
def snake():
    return render_template('snake.html')  

@app.route('/contact.html')
def contact(): 
    return render_template('contact.html')


@app.route('/login.html', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        user = users_db.get(username)

        if user and check_password_hash(user['password'], password):
            session['username'] = username  # Stores the username in session
            flash("Logged in successfully!", "success")
            return redirect(url_for('home'))  # Redirects to the home page
        else:
            flash("Invalid username or password", "danger")
            return render_template('login.html', error="Invalid username or password")

    return render_template('login.html')


@app.route('/signup.html', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        if username in users_db:
            return render_template('signup.html', error="Username already exists")

        users_db[username] = {'email': email, 'password': generate_password_hash(password)}

        return render_template('signup.html', success="Account created successfully!")

    return render_template('signup.html')


@app.route('/dashboard')
def dashboard():
    if 'username' not in session:
        return redirect(url_for('login'))
    return f'Welcome, {session["username"]}!'

@app.route('/logout')
def logout():
    session.pop('username', None)  # Correctly pops the session variable
    flash("You have been logged out.", "info")
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True)
