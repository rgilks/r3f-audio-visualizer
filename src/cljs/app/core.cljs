(ns app.core
  (:require 
           [uix.core :refer [defui $]]
           [uix.dom]))

(defui hi []
  ($.div "Hello from ClojureScript!"))

(defonce root
  (when-let [app-el (js/document.getElementById "app")]
    (uix.dom/create-root app-el)))

(defn ^:dev/after-load init []
  (.render root ($ hi)))

(defn ^:export main []
  (init))
