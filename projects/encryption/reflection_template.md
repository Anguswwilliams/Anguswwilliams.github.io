# Encryption Activity Reflection


## Part 1: Key Exchange

My Key:
My Partner's Key:

Our initial shared key:

## Part 2: Messaging

Complete this table with each of your messages. This should 
include the entire conversation - the messages that you sent
and the messages that you received.

(If you used something other than the caesar cipher here, describe what you did)

| Encoded Message | Decoded Message | Key |
| --------------- | --------------- | --- |
|                 |                 |     |
|                 |                 |     |
|                 |                 |     |
|                 |                 |     |


## Part 3: Connection to TCP/IP Model

### Application Layer: Turn your message into binary

Everything we've done in this activity takes place in the application layer. By the time the message leaves the application
layer, it is encoded in binary. We've been working with text for this activity for convenience, but let's see what the binary
looks like.

Go back to the first encrypted message that you sent (it should be in `rsa_encryption_activity/send/encrypted_message.b64`).

This message is represented as a string of letters, numbers, and symbols. But we know that the real message is in binary.

Select the first six characters from this message and copy them here:

Using the ASCII table, convert these five characters to binary (if necessary,
include leading zeroes so that each character is 8 bits): 

### Transport Layer: Break your message into packets

Assume that each packet can hold two bytes. Fill in the packet information below with the binary values you computed above.

    =========
    Packet 1:

    Source: [Your Name]
    Destination: [Partner's Name]  
    Sequence: 1/3
    Data: [binary for char 1] [binary for char 2]
    =========
    Packet 2:

    Source: [Your Name]
    Destination: [Partner's Name]
    Sequence: 2/3 
    Data: [binary for char 3] [binary for char 4]
    =========
    Packet 3:

    Source: [Your Name]
    Destination: [Partner's Name]
    Sequence: 3/3
    Data: [binary for char 5] [binary for char 6]
    =========

## Part 4: Reflection Questions

- What is the difference between symmetric and asymmetric encryption? What purpose did each serve in this simulation?
- Why is it important that this protocol uses a new key for each message?
- Why is it important that you never share your secret key?
- In the transport layer, do these messages use TCP or UDP? Why?
- Now that you've created packets in the transport layer, give a short explanation of what happens to these packets in the internet layer and in the link layer.
- This protocol successfully encrypts the **content** of the message. Even though and adversary in the middle can't read the content of the message, what other
information can they still see?
