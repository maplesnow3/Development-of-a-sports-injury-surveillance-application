# Generating a hashed password for manipulating stored password data in database
# directly


import bcrypt

# ENTER YOUR PLAIN PASSWORD HERE:
password_plaintext = b'example_password'

salt = b'$2a$06$AGM/cv8Hw/w4bkj8PJsM0.'
password_hashed = bcrypt.hashpw(password_plaintext, salt)

print(password_hashed.decode('UTF-8'))
