#!/usr/bin/env python
# coding: utf-8


import requests
import json
import re
import os


url = "http://himawari8-dl.nict.go.jp/himawari8/img/D531106/latest.json?uid=1495684555889"
# # imgsrc = "http://himawari8-dl.nict.go.jp/himawari8/img/D531106/thumbnail/550/2017/05/25/033000_0_0.png"
imgsrc = "http://himawari8-dl.nict.go.jp/himawari8/img/D531106/thumbnail/550/%s/%s/%s/%s00_0_0.png"
r = requests.get(url=url)
data = json.loads(r.text)

rr = re.compile(r'\d+')
res = rr.findall(data['file'])
date = res[1]
time = res[2]
dl = imgsrc % (date[:4], date[4:6], date[6:9], time)
filename = "%s00_0_0.png" % (time)


os.system("wget %s -O %s" %( dl, filename))



datajson = '{"url": "https://raw.githubusercontent.com/yzimhao/chrome-kjs/dev/newtabimage/%s"}' % filename
fp = open("data.json", "w+")
fp.write(datajson)
fp.close()


os.system('git add .')
os.system('git commit -m "update %s"' % filename)
os.system('git push')
