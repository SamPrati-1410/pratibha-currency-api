## CURRENCY MARKET PRICE - Global Currency Index

Cryptocurrency price data - Bitcoin (BTC) to United States Dollar (USD)


## Motivation

BitcoinAverage BTC to USD API!!! This API can be used to gather real-time  Bitcoin (BTC) to United States Dollar (USD) price and historical price data for last 2 hours.

## Integration

All authenticated requests must contain Header X-signature Containing timestamp, public_key and digest_value

Step 1 - Create a payload consisting of “timestamp.public_key”:
timestamp 
This is an integer value representing the unix epoch. This needs to be no more than 15 seconds different than bitcoinaverage.com server time for the request to pass. This prevents replay attacks. 

Public API Key as a string

Step 2 - The payload needs to be HMAC encrypted with the sha256 algorithm using API secret key that corresponds to the given public key in the payload. This result is called a 'digest_value' and needs to be in hex representation:

Secret key = abcdef123456
digest_value = a963aa66dbe4871ca17bbd64d5c1043d2f9204f19538b6e0f69c78f04adab9c8

Step 3 - Finally we can compose the value that needs to be used in the X-signature header. It’s contents need to be in the format:
timestamp.public_key.digest_value


## API End Point - bitcoinaverage.com

End Points - 1. https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD used to get current price updates every 5 seconds 
             2. https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?period=daily&?format=json  used for historical price data


## Built With

JQUery library
SHA256 algorithm encryption CDN 

## Author

Project by Pratibha S

## License

Free to use