# AI Doctor Assistant
### Your assistant to Health-care related problems 


We have successfully developed a fully compact solution for basic diseases with Automated assistance. The platform is able to predict the severity of critical diseases such as Covid-19, Pneumonia, Breast cancer, etc. through X-Rays. This provides a self detecting capability to the patients. It will be time efficient and will prove to be very pivotal in the long run as critical diseases, if detected early, can increase the chances of saving a life.

### There are 4 services in this project:

- **Disease Predictor** : Users can fill-in the symptoms that they can see on themselves and our AI powered classifier tries to predict what disease they might have. Not only that, we also provide the reason for the prediction. Which symptoms are the main ones for the predicted disease.
- **Covid-19 Pneumonia Predictor** : Users can upload their Chest X-Ray file, and we try to predict whether your condition is _Normal_, or have _Covid-19_, or have _Viral Pneumonia_, or have _Non-Covid Lung Infection_.
- **Breast Cancer Segmentation** : Users can upload the Ultrasound image of their breast, and our model tries to segment the cancerous portions.
- **Hand Bone Fracture Detection** : Users can upload the X-Ray image of their hand, and we localise the fracture in the image.

#### Tools and Libraries used:

- **_Numpy and Pandas_** : Exploratory Data Analysis
- **_Scikit-learn_** : Machine Learning Models
- **_Shap_** : Generating Shapley Values
- **_OpenCV_** : Image Processing
- **_Tensorflow and Keras_** : Deep Learning Models
- **_Flask_** : Backend Server
- **_ReactJS_** : Frontend Server
