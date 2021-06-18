from urllib import request

def start(filename, downloadURL):
  # Download remote and save locally
  savedFile = request.urlretrieve(str(downloadURL), 'imgs/' + str(filename))
  print(savedFile)
  return 'imgs/' + str(filename)