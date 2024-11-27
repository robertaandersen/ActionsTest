yarn --silent is-unicorn || false

if [ $? -eq 0 ]; then
    echo "Unicorn is affected"
else
    echo "Unicorn is not affected"
fi
