
We have a contact-keeper app created using flask as backend and HTML,CSS and JS in frontend.
Our aim is to devopsify this project and focus more on the deployment and automating build , tests etc

Basically what we are doing :

![[Pasted image 20250505191050.png]]


The GitHub repo:
![[Pasted image 20250505193748.png]]


The Current Application:

![[Pasted image 20250505192959.png]]


![[Pasted image 20250505193037.png]]


### Prerequisites:

1> Creating the 2 EC2 instances we need - CI server and Deployment server

![[Pasted image 20250505193208.png]]

2>  Docker
    
3>. Minikube
    
4>. kubectl

All the pre-requisites are installed with below script

```
# Steps:-

# For Docker Installation
sudo apt-get update
sudo apt-get install docker.io -y
sudo usermod -aG docker $USER && newgrp docker

# For Minikube & Kubectl
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube 

sudo snap install kubectl --classic
minikube start --driver=docker

```


Installing Docker on the CI-Server

![[Pasted image 20250505224417.png]]

Cloning the Source Code Repository:

![[Pasted image 20250505224738.png]]


# Containerize the Application using Docker

- Write a Dockerfile with the following code:

![[Pasted image 20250505194915.png]]



Now we will build and push image to DockerHub

![[Pasted image 20250505230400.png]]



![[Pasted image 20250505230451.png]]


Now pushing the image to DockerHub

Logging in to DockerHub

![[Pasted image 20250505231018.png]]


![[Pasted image 20250505231206.png]]



Pushing to DockerHub

![[Pasted image 20250505231311.png]]

I have also verified that the newly created image is showing up on my DockerHub

![[Pasted image 20250505231555.png]]


Now we need to configure the Deployment server

Connecting to the Deployment Server
![[Pasted image 20250505231745.png]]

Installing Pre-requisites on the server

![[Pasted image 20250505231904.png]]



![[Pasted image 20250505232424.png]]



Deployment + Service + Ingress - Setup and configuration 


Writing the Deployment file for our app to be scalabe

![[Pasted image 20250505233816.png]]

Written Deployment.yml


Applying Deployment.yml

![[Pasted image 20250505233854.png]]

Deployment created named: deployment.apps/contactmanagement


![[Pasted image 20250505234022.png]]



Writing Service.yml

![[Pasted image 20250506012500.png]]


Getting the minikube service url:


![[Pasted image 20250506012613.png]]


Exposing the app:

1. First We need to expose our deployment so use `kubectl expose deployment contactmanagement-deployment --type=NodePort` command.

2.  1. Then We have to expose our app service `kubectl port-forward svc/contactmanagement-service 3000:3000 --address 0.0.0.0 &`


Port forwarding done successfully

![[Pasted image 20250506020835.png]]



Our app is finally running on a kubernetes cluster in EC2 with scalable deployment and is exposed publicly:


![[Pasted image 20250506020957.png]]

