import glob
from PIL import Image

for file in glob.glob("output/*"):
  i = Image.open(file)
  i.convert("CMYK").save(file.replace(".png", ".tiff").replace("output/", "forprint/"))