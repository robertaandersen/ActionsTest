   UNICORN=$(yarn --silent is-unicorn)
          if [ "$UNICORN" = true ]; then
              echo "unicorn is detected"
          else
              echo "No unicorn"
          fi