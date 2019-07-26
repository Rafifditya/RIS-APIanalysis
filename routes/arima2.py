from pandas import read_csv
from pandas import datetime
from statsmodels.tsa.arima_model import ARIMA
from sklearn.metrics import mean_squared_error
import json, sys, csv
from itertools import izip
from math import sqrt

def parser(x):
	return datetime.strptime(x, '%Y-%m-%d')

series = read_csv('/home/rafif/TA/myappal/routes/gw.csv', header=0, squeeze=True, date_parser=parser)
# print(series)
X = series.values
X = X.astype('float32')
size = int(7)
train, test = X[0:size], X[size:len(X)]
# print(len(train))
history = [x for x in train]
predictions = list()
listpred = list()
resdata = list()
expectations = list()
for t in range(len(test)):
	model = ARIMA(history[-7:], order=(0,1,0))
	model_fit = model.fit(disp=0)
	output = model_fit.forecast()
	yhat = output[0]
	predictions.append(yhat)
	obs = test[t]
	history.append(obs)
	# print(history)
	# print(history[-7:])
	# print('%f,%f' % (yhat, obs))
	expectations.append(obs)
	# a = {'prediction': yhat, 'expectation':obs}
	# strres = yhat+","+obs
	# resdata.append(a)
	# sys.stdin.flush()
# print(json.dumps(predictions,ensure_ascii=False))
# b = json.dumps(resdata)
for pred in predictions:
	listpred.append(int(pred[0]))
# print(predictions)
with open('/home/rafif/TA/myappal/routes/hasil1.csv', 'wb') as csvfile:
    wr = csv.writer(csvfile)
    wr.writerows(izip(listpred, expectations))
csvfile.close()
# print(resdata)
error = sqrt(mean_squared_error(test, predictions))
print('Test RMSE: %.3f' % error)
