# from urllib import request
from skimage import io
import cv2

# def start(filename, downloadURL):
#   # Download remote and save locally
#   savedFile = request.urlretrieve(str(downloadURL), 'imgs/' + str(filename))
#   print(savedFile)
#   return 'imgs/' + str(filename)

def start(filename, downloadURL):
  img = io.imread(downloadURL)
  img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
  return img