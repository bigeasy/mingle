all: cert.pem


#
# Create Certificate Authority: ca1
# ('password' is used for the CA password.)
#
ca-cert.pem: ca.cnf
	openssl req -new -x509 -days 9999 -config ca.cnf -keyout ca-key.pem -out ca-cert.pem

#
# agent1 is signed by ca1.
#

key.pem:
	openssl genrsa -out key.pem 1024

csr.pem: cert.cnf key.pem
	openssl req -new -config cert.cnf -key key.pem -out csr.pem

cert.pem: csr.pem ca-cert.pem ca-key.pem
	openssl x509 -req \
		-extensions v3_req \
		-days 9999 \
		-passin "pass:password" \
		-in csr.pem \
		-CA ca-cert.pem \
		-CAkey ca-key.pem \
		-CAcreateserial \
		-extfile cert.cnf \
		-out cert.pem

verify: cert.pem ca-cert.pem
	openssl verify -CAfile ca-cert.pem cert.pem

clean:
	rm -f *.pem *.srl

test: verify


.PHONY: all clean test verify
