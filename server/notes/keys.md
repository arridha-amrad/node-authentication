/_ cSpell:disable _/

how to generate keys

openssl genrsa -out private.pem 1024
openssl rsa -in private.pem -pubout -out public.pem
