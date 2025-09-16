FROM node:lts

WORKDIR /app

EXPOSE 3000

# Copy the package.json and pnpm-lock.yaml files to the container
COPY package.json ./
#COPY patches ./patches
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm i

COPY . .

RUN yarn build

# https://github.com/blitz-js/blitz/issues/4354
RUN cp -r ./node_modules/.pnpm/sodium-native@3.4.1/node_modules/sodium-native/prebuilds ".next/server/app/(auth)/login"
RUN cp -r ./node_modules/.pnpm/sodium-native@3.4.1/node_modules/sodium-native/prebuilds ".next/server/app/api/rpc/[[...blitz]]"
RUN cp -r ./node_modules/.pnpm/sodium-native@3.4.1/node_modules/sodium-native/prebuilds ".next/server/app/(auth)/reset-password"

CMD yarn start

.form {
  /* Form styles */
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.inputField {
  /* Input field styles */
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}