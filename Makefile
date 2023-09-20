#GET_DB_SECRET=$(shell vlt secrets get -plaintext DATABASE_URL)
#GET_RESEND_SECRET=$(shell vlt secrets get -plaintext RESEND_API_KEY)
#GET_CLIENT_SECRET_KEY=$(shell vlt secrets get -plaintext CLERK_SECRET_KEY)
#GET_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$(shell vlt secrets get -plaintext NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
  
.PHONY: all
all: env node


# Dev Env
.PHONY: env
env: .env.local

.env.local:
	echo DATABASE_URL='mysql://am8ly2ifu8uoz526wpar:pscale_pw_AvvxymHmlmIDzAIcennoGOetpoUDCMUSpOqaFj8BgqJ@aws.connect.psdb.cloud/pvc-tms-test?sslaccept=strict' > $@
	echo BASE_URL=http://localhost:3000 >> $@
	echo RESEND_API_KEY=re_VTN9crGK_CCysPUMWnps2yVvgLuYc3RPp >> $@
	echo NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cHJvbW90ZWQtaG9nLTk1LmNsZXJrLmFjY291bnRzLmRldiQ >> $@
	echo CLERK_SECRET_KEY=sk_test_hrA2ztJv49yKNOJfEBVOIuR2y9pKv442uDYKe0Mguj >> $@
	echo "NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in" >> $@
	echo "NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up" >> $@
	echo "NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/" >> $@
	echo "NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/" >> $@

# Node Modules
.PHONY: node
node: | node_modules

node_modules:
	npm install


# Cleanup
.PHONY: cleanenv 
cleanenv: 
	rm .env.local

.PHONY: cleannode		
cleannode: 
	rm -r node_modules/

.PHONY: cleanall
cleanall: cleanenv cleannode
