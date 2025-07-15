provider "aws" {
  region = var.aws_region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

resource "aws_instance" "blog_ec2" {
  ami                    = "ami-021a584b49225376d"  
  instance_type          = var.instance_type
  key_name               = var.key_name

  vpc_security_group_ids = [aws_security_group.blog_sg.id]

  user_data = <<-EOF
              #!/bin/bash
              sudo apt update -y
              sudo apt install docker.io docker-compose git -y
              git clone ${var.repo_url}
              cd Mult_Cloud_Diaster_Recovery_System
              sudo docker-compose up --build -d
              EOF

  tags = {
    Name = "BlogApp-EC2"
  }
}

resource "aws_security_group" "blog_sg" {
  name        = "blog-sg"
  description = "Allow ports for frontend and backend"

  ingress {
    from_port   = 4173
    to_port     = 4173
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
