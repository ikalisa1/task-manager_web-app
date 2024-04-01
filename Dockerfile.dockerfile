# Use Ubuntu 22.04 as the base image
FROM ubuntu:22.04

# Update package repositories and install Python 3 and pip
RUN apt-get update && apt-get install -y python3 python3-pip

# Install Flask web framework
RUN pip install flask==3.0.*

# Copy the Flask application file into the Docker image
COPY hello.py /

# Set the environment variable to specify the Flask application file
ENV FLASK_APP=hello

# Expose port 8000 to allow external access
EXPOSE 8000

# Command to start the Flask development server
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "8000"]
