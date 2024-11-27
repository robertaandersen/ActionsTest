UNICORN=$(yarn --silent deubg)
if [ "$UNICORN" = 'true' ]; then
    echo "unicorn is detected"
else
    echo "No unicorn"
fi
